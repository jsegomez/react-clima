import { useState } from 'react';
import { countries } from '../../data/countries';
import styles from './Form.module.css';
import type { SearchFormData } from '../../types';

export default function Form() {
    const [formData, setFormData] = useState<SearchFormData>({
        city: '',
        country: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
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
        </form>
    )
}