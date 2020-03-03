import * as React from 'react';
import { BaseTextFieldProps } from '@material-ui/core/TextField';
interface ITextFieldWIthDebounce extends BaseTextFieldProps {
    value: string | number;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    debounceTimeout?: number;
    variant?: 'filled' | 'filled' | 'outlined';
    titleCase?: boolean;
}
declare const TextFieldWithDebounce: React.FC<ITextFieldWIthDebounce>;
export default TextFieldWithDebounce;
