import { useTheme } from '@/components/theme-provider';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <label aria-checked="false" role="switch" className="switch">
      <input
        type="checkbox"
        onChange={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
        checked={theme === 'dark' ? true : false}
      />
      <span className="slider">
        <span className="slider-inner"></span>
      </span>
    </label>
  );
};

export default ThemeToggle;
