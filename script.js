// 添加检测系统主题偏好的功能
function detectSystemTheme() {
  // 检查浏览器是否支持媒体查询
  if (window.matchMedia) {
    // 检测系统是否偏好深色模式
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 根据系统偏好设置主题
    if (darkModeMediaQuery.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // 监听系统主题变化
    darkModeMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });
  }
}

// 页面加载时检测系统主题
document.addEventListener('DOMContentLoaded', detectSystemTheme);

// 主题切换按钮功能
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    // 检查当前主题
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // 切换主题
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });
} 