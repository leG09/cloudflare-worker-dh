// 主题切换功能
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    console.log('切换到浅色主题');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    console.log('切换到深色主题');
  }
}

// 检测系统主题偏好
function detectSystemTheme() {
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (darkModeMediaQuery.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      console.log('系统偏好深色模式，已应用深色主题');
    } else {
      document.documentElement.removeAttribute('data-theme');
      console.log('系统偏好浅色模式，已应用浅色主题');
    }
    
    darkModeMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        console.log('系统主题变更为深色模式');
      } else {
        document.documentElement.removeAttribute('data-theme');
        console.log('系统主题变更为浅色模式');
      }
    });
  }
}

// 从本地存储加载主题设置
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    console.log('从本地存储加载深色主题');
    return true;
  } else if (savedTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    console.log('从本地存储加载浅色主题');
    return true;
  }
  return false;
}

// 初始化主题
function initTheme() {
  // 先尝试加载保存的主题，如果没有保存的主题再检测系统主题
  if (!loadSavedTheme()) {
    detectSystemTheme();
  }
  
  // 设置主题切换按钮事件
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
}

// 页面加载完成后初始化主题
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// 添加调试信息
setTimeout(() => {
  console.log('当前HTML data-theme属性:', document.documentElement.getAttribute('data-theme'));
  console.log('当前body背景色:', getComputedStyle(document.body).backgroundColor);
  console.log('当前body文本色:', getComputedStyle(document.body).color);
}, 1000); 