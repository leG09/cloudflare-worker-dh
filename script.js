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
  
  // 延迟一点时间后刷新dom.js生成的内容样式
  setTimeout(() => {
    refreshDomStyles();
  }, 100);
}

// 刷新dom.js生成的内容样式
function refreshDomStyles() {
  // 获取所有由dom.js生成的元素
  const domElements = document.querySelectorAll('#jjjjjjjjjjjjjjj *');
  
  // 检查是否处于暗色模式
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  
  // 应用适当的样式
  domElements.forEach(el => {
    // 处理链接元素
    if (el.tagName === 'A') {
      if (isDarkMode) {
        el.style.backgroundColor = '#383838';
        el.style.color = '#f1f1f1';
        el.style.borderColor = '#4d4d4d';
      } else {
        el.style.backgroundColor = '';
        el.style.color = '';
        el.style.borderColor = '';
      }
    }
    
    // 处理SVG图标
    if (el.tagName === 'svg' || el.querySelector('svg')) {
      const svg = el.tagName === 'svg' ? el : el.querySelector('svg');
      if (svg) {
        if (isDarkMode) {
          svg.style.fill = '#f1f1f1';
          svg.style.color = '#f1f1f1';
        } else {
          svg.style.fill = '';
          svg.style.color = '';
        }
      }
    }
    
    // 处理文本元素
    if (el.tagName === 'SPAN' || el.tagName === 'LI' && el.classList.contains('title')) {
      if (isDarkMode) {
        el.style.color = '#f1f1f1';
      } else {
        el.style.color = '';
      }
    }
  });
  
  // 处理mylist容器
  const mylists = document.querySelectorAll('.mylist');
  mylists.forEach(list => {
    if (isDarkMode) {
      list.style.backgroundColor = '#2d2d2d';
      list.style.borderColor = '#3d3d3d';
    } else {
      list.style.backgroundColor = '';
      list.style.borderColor = '';
    }
  });
  
  console.log('已刷新dom.js生成的内容样式');
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
      
      // 系统主题变化时也刷新dom.js内容
      setTimeout(() => {
        refreshDomStyles();
      }, 100);
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

// 监听dom.js生成内容的变化
function observeDomChanges() {
  // 创建一个MutationObserver实例
  const observer = new MutationObserver((mutations) => {
    // 检查是否有dom.js相关的内容变化
    for (const mutation of mutations) {
      if (mutation.target.id === 'jjjjjjjjjjjjjjj' || 
          mutation.target.closest('#jjjjjjjjjjjjjjj')) {
        // 发现dom.js生成的内容变化，应用主题样式
        refreshDomStyles();
        break;
      }
    }
  });
  
  // 开始观察document.body的子树变化
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
  
  return observer;
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
  
  // 确保dom.js内容加载完成后应用主题样式
  setTimeout(() => {
    refreshDomStyles();
  }, 500);
  
  // 开始观察DOM变化
  observeDomChanges();
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