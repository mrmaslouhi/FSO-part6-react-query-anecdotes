import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient}>
    <App />
  </QueryClientProvider>
)