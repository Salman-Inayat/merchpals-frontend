import { makeStyles } from '@mui/styles';
import './checkbox.css';

const Checkbox = ({
  onChange = () => {},
  label = '',
  checked = true,
  value = ''
}) => (
    <label className="container">{label}
    <input type="checkbox" checked={checked} onChange={() => onChange(value)}/>
    <span className="checkmark"></span>
  </label>
)

export { Checkbox as default }