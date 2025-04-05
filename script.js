// 添加检测系统主题偏好的功能
function detectSystemTheme() {
  // 检查浏览器是否支持媒体查询
  if (window.matchMedia) {
    // 检测系统是否偏好深色模式
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 根据系统偏好设置主题
    if (darkModeMediaQuery.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      console.log('系统偏好深色模式，已应用深色主题');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      console.log('系统偏好浅色模式，已应用浅色主题');
    }
    
    // 监听系统主题变化
    darkModeMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        console.log('系统主题变更为深色模式');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        console.log('系统主题变更为浅色模式');
      }
    });
  }
}

// 确保在DOM加载完成后立即执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', detectSystemTheme);
} else {
  // 如果DOM已经加载完成，立即执行
  detectSystemTheme();
}

// 主题切换按钮功能
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      // 检查当前主题
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      // 切换主题
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        console.log('手动切换到浅色主题');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        console.log('手动切换到深色主题');
      }
    });
  }
}); 