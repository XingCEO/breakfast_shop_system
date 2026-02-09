import { registerRootComponent } from 'expo';
import RestaurantApp from './src/RestaurantApp';

// 為 Web 環境添加根層級樣式
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
    html, body, #root {
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  `;
    document.head.appendChild(style);
}

registerRootComponent(RestaurantApp);
