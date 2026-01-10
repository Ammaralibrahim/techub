/**
 * Toast Notification Manager
 */
class ToastManager {
  constructor() {
    this.toasts = [];
    this.subscribers = [];
    this.maxToasts = 3;
    this.defaultDuration = 4000;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify(toast) {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const toastWithDefaults = {
      id,
      duration: this.defaultDuration,
      position: 'bottom-right',
      ...toast,
      timestamp: new Date().toISOString()
    };

    this.toasts = [toastWithDefaults, ...this.toasts].slice(0, this.maxToasts);
    this.emit();
    
    if (toastWithDefaults.duration !== Infinity) {
      setTimeout(() => {
        this.remove(id);
      }, toastWithDefaults.duration);
    }

    return id;
  }

  success(message, options = {}) {
    return this.notify({
      type: 'success',
      message,
      icon: 'check',
      ...options
    });
  }

  error(message, options = {}) {
    return this.notify({
      type: 'error',
      message,
      icon: 'alert',
      ...options
    });
  }

  info(message, options = {}) {
    return this.notify({
      type: 'info',
      message,
      icon: 'info',
      ...options
    });
  }

  warning(message, options = {}) {
    return this.notify({
      type: 'warning',
      message,
      icon: 'warning',
      ...options
    });
  }

  remove(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.emit();
  }

  clear() {
    this.toasts = [];
    this.emit();
  }

  emit() {
    this.subscribers.forEach(callback => callback([...this.toasts]));
  }

  getToasts() {
    return [...this.toasts];
  }
}

// Global instance
export const toastManager = new ToastManager();

/**
 * Hook for React components
 */
export function useToast() {
  const showToast = (type, message, options = {}) => {
    const methods = {
      success: toastManager.success.bind(toastManager),
      error: toastManager.error.bind(toastManager),
      info: toastManager.info.bind(toastManager),
      warning: toastManager.warning.bind(toastManager),
      custom: toastManager.notify.bind(toastManager)
    };

    return methods[type] ? methods[type](message, options) : methods.custom({ type, message, ...options });
  };

  return {
    success: (message, options) => showToast('success', message, options),
    error: (message, options) => showToast('error', message, options),
    info: (message, options) => showToast('info', message, options),
    warning: (message, options) => showToast('warning', message, options),
    show: showToast,
    remove: toastManager.remove.bind(toastManager),
    clear: toastManager.clear.bind(toastManager)
  };
}

// Convenience functions
export const toast = {
  success: (message, options) => toastManager.success(message, options),
  error: (message, options) => toastManager.error(message, options),
  info: (message, options) => toastManager.info(message, options),
  warning: (message, options) => toastManager.warning(message, options),
  show: (toast) => toastManager.notify(toast),
  remove: (id) => toastManager.remove(id),
  clear: () => toastManager.clear()
};

export default toastManager;