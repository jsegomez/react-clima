import { useState } from 'react';
import { countries } from '../../data/countries';
import styles from './Form.module.css';
import type { SearchFormData } from '../../types';
import Alert from '../Alert/Alert';

type FormProps = {
    fetchWeather: (city: string, country: string) => Promise<void>;
};

export default function Form({ fetchWeather }: FormProps) {
    const [formData, setFormData] = useState<SearchFormData>({
        city: '',
        country: ''
    });

    const [alert, setAlert] = useState('');

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.city || !formData.country) {
            setAlert('Por favor complete todos los campos');
            return;
        }

        fetchWeather(formData.city, formData.country);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label htmlFor="city">Ciudad</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ciudad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País</label>
                <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                    <option value="">Seleccione un país</option>
                    {countries.map(({ name, code }) => (
                        <option key={code} value={code}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <input type="submit"  value="Consultar clima" />
            {alert && <Alert>{alert}</Alert>}
        </form>
    )
}