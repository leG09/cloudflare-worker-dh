// 添加检测系统主题偏好的功能
function detectSystemTheme() {
  // 检查浏览器是否支持媒体查询
  if (window.matchMedia) {
    // 检测系统是否偏好深色模式
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 根据系统偏好设置主题
    if (darkModeMediaQuery.matches) {
      applyTheme('dark');
      console.log('系统偏好深色模式，已应用深色主题');
    } else {
      applyTheme('light');
      console.log('系统偏好浅色模式，已应用浅色主题');
    }
    
    // 监听系统主题变化
    darkModeMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        applyTheme('dark');
        console.log('系统主题变更为深色模式');
      } else {
        applyTheme('light');
        console.log('系统主题变更为浅色模式');
      }
    });
  }
}

// 应用主题函数
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // 强制更新所有元素样式
  document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  document.body.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
  
  // 保存主题设置到本地存储
  localStorage.setItem('theme', theme);
}

// 从本地存储加载主题设置
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
    console.log(`从本地存储加载主题: ${savedTheme}`);
    return true;
  }
  return false;
}

// 确保在DOM加载完成后立即执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // 先尝试加载保存的主题，如果没有保存的主题再检测系统主题
    if (!loadSavedTheme()) {
      detectSystemTheme();
    }
  });
} else {
  // 如果DOM已经加载完成，立即执行
  if (!loadSavedTheme()) {
    detectSystemTheme();
  }
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
        applyTheme('light');
        console.log('手动切换到浅色主题');
      } else {
        applyTheme('dark');
        console.log('手动切换到深色主题');
      }
    });
  }
});

// 添加调试信息
console.log('当前主题设置:', document.documentElement.getAttribute('data-theme'));
console.log('CSS变量 --background-color:', getComputedStyle(document.documentElement).getPropertyValue('--background-color'));
console.log('CSS变量 --text-color:', getComputedStyle(document.documentElement).getPropertyValue('--text-color'));
console.log('body 背景色:', getComputedStyle(document.body).backgroundColor);
console.log('body 文本色:', getComputedStyle(document.body).color); 