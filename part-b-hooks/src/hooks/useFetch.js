import { useState, useEffect, useCallback } from 'react';
import { initialExpenses } from '../data/initialData';

// Key for storing custom MockAPI endpoint in browser
const STORAGE_API_KEY = 'mockapi_endpoint_url';
const STORAGE_LOCAL_DATA = 'mockapi_local_expenses_cache';

// Default mockapi endpoint (students can create one on mockapi.io or enter theirs)
export const DEFAULT_MOCKAPI_URL =
  'https://67280aa3270bd0b333145452.mockapi.io/api/v1/expenses';

/**
 * Custom Hook: useFetch
 * Requirement: Lấy, thêm, xóa dữ liệu qua mockapi bằng custom hook useFetch;
 * có trạng thái đang tải (loading) và lỗi (error).
 */
export const useFetch = () => {
  const [apiUrl, setApiUrlState] = useState(() => {
    return localStorage.getItem(STORAGE_API_KEY) || DEFAULT_MOCKAPI_URL;
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Helper: Load local cached data as reliable fallback
  const getLocalFallbackData = () => {
    try {
      const cached = localStorage.getItem(STORAGE_LOCAL_DATA);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // fallback to initialExpenses
    }
    return initialExpenses;
  };

  // Helper: Save local cached data
  const saveLocalFallbackData = (items) => {
    try {
      localStorage.setItem(STORAGE_LOCAL_DATA, JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  };

  /**
   * 1. GET: Lấy danh sách dữ liệu từ MockAPI
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(`[useFetch] Đang gửi GET request đến MockAPI: ${apiUrl}`);
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`[useFetch] Lấy dữ liệu thành công (${result.length} bản ghi)`);
      setData(result);
      saveLocalFallbackData(result);
      setIsUsingFallback(false);
    } catch (err) {
      console.warn(`[useFetch] Lỗi khi gọi MockAPI (${err.message}). Kích hoạt dữ liệu dự phòng cục bộ.`);
      setError(`Không thể kết nối đến MockAPI: ${err.message}. Đang sử dụng bộ nhớ cục bộ.`);
      const fallback = getLocalFallbackData();
      setData(fallback);
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // Initial fetch on mount or when apiUrl changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * 2. POST: Thêm mới khoản chi lên MockAPI
   */
  const addExpense = async (newItem) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`[useFetch] Đang gửi POST request thêm khoản chi mới lên: ${apiUrl}`);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error(`POST Error: ${response.status} - ${response.statusText}`);
      }

      const created = await response.json();
      console.log('[useFetch] Thêm khoản chi thành công:', created);
      const updated = [created, ...data];
      setData(updated);
      saveLocalFallbackData(updated);
      return { success: true, item: created };
    } catch (err) {
      console.warn(`[useFetch] Lỗi POST MockAPI (${err.message}). Lưu vào bộ nhớ cục bộ.`);
      setError(`Lỗi khi gửi lên MockAPI: ${err.message}. Đã lưu tạm vào bộ nhớ cục bộ.`);
      const fallbackItem = {
        ...newItem,
        id: newItem.id || `local-${Date.now()}`,
      };
      const updated = [fallbackItem, ...data];
      setData(updated);
      saveLocalFallbackData(updated);
      setIsUsingFallback(true);
      return { success: true, item: fallbackItem, fallback: true };
    } finally {
      setLoading(false);
    }
  };

  /**
   * 3. DELETE: Xóa khoản chi trên MockAPI
   */
  const deleteExpense = async (id) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`[useFetch] Đang gửi DELETE request xóa khoản chi id=${id} lên: ${apiUrl}/${id}`);
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`DELETE Error: ${response.status} - ${response.statusText}`);
      }

      console.log(`[useFetch] Xóa thành công trên MockAPI id=${id}`);
      const updated = data.filter((item) => String(item.id) !== String(id));
      setData(updated);
      saveLocalFallbackData(updated);
      return { success: true };
    } catch (err) {
      console.warn(`[useFetch] Lỗi DELETE MockAPI (${err.message}). Xóa trên bộ nhớ cục bộ.`);
      setError(`Lỗi xóa trên MockAPI: ${err.message}. Đã xóa trên bộ nhớ cục bộ.`);
      const updated = data.filter((item) => String(item.id) !== String(id));
      setData(updated);
      saveLocalFallbackData(updated);
      setIsUsingFallback(true);
      return { success: true, fallback: true };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cấu hình URL endpoint MockAPI tùy chọn
   */
  const updateApiUrl = (newUrl) => {
    const trimmed = (newUrl || '').trim();
    if (trimmed) {
      localStorage.setItem(STORAGE_API_KEY, trimmed);
      setApiUrlState(trimmed);
    }
  };

  const resetApiUrl = () => {
    localStorage.removeItem(STORAGE_API_KEY);
    setApiUrlState(DEFAULT_MOCKAPI_URL);
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    addExpense,
    deleteExpense,
    apiUrl,
    updateApiUrl,
    resetApiUrl,
    isUsingFallback,
  };
};

export default useFetch;
