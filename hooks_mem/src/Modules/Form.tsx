import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Form: React.FC = () => {
    
    // начальные значения полей формы
    const initialValues: FormValues = { name: '', email: '', password: '' };
    // текущие значения полей формы.
    const [values, setValues] = useState<FormValues>(initialValues);
    // ошибки валидации формы 
    const [errors, setErrors] = useState<FormErrors>({});
    // ссылка на DOM-элемент формы (для фокусировки на первом поле с ошибкой)
    const formRef = useRef<HTMLFormElement>(null);
    // флаг (отправлена ли форма)
    const [submitted, setSubmitted] = useState(false);

    // при любом изменении полей вызывается этот хэндлер
    // и обновляет values
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    }, []);

    // дял валидации введенных значений
    const validate = useMemo(() => {
        const newErrors: FormErrors = {};
        // проверяем, чтобы имя было не слишком коротким и содержало только буквы
        if (values.name.length < 3) newErrors.name = 'Имя должно содержать хотя бы 3 символа';
        if (!/^[a-zA-Z]+$/.test(values.name)) newErrors.name = 'Имя должно содержать только буквы';
        // проверяем mail, чтобы был формата xxx@xxx.x
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) newErrors.email = 'Введите правильный email';
        // проверяем длину пароля
        if (values.password.length < 6) newErrors.password = 'Пароль должен содержать хотя бы 6 символов';
        return newErrors;
    }, [values]);

    // обновляем ошибки с помощью нашей validate
    useEffect(() => {
        setErrors(validate);
    }, [validate]);

    // смотрим, есть ли ошибки, и обновляем флаг
    const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

    // хэндлер для отправки
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // если всё валидно, можем отправить данные, куда будет необходимо
        if (isValid) {
            setSubmitted(true);
        }
    };

  return (
    //возвращаем форму
    <form ref={formRef} onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="name">Имя:</label>
        <input name="name" value={values.name} onChange={handleChange} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input name="email" value={values.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Пароль:</label>
        <input type="password" name="password" value={values.password} onChange={handleChange} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <button type="submit" disabled={!isValid}>Отправить</button>

      {submitted && <p>Форма успешно отправлена</p>}
    </form>
  );
};

export default Form;