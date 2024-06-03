import styles from '@/styles/card.module.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const ListNotes = ({ notes }) => {

    const [data, setData] = useState(notes);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([... new Set(notes.map(e => e.category))])

    const router = useRouter();

    const deleteNote = (id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'are you sure you want to delete this note?',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes!',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: "Your note has been deleted.",
                            icon: "success",
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Thanks!',
                            timer: 2000,
                            timerProgressBar: true
                        })
                        const updatedData = data.filter(e => e.id !== id)
                        setData(updatedData)
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Error',
                            text: err.response.data.message,
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: ':(!',
                            timer: 5000,
                            timerProgressBar: true
                        });
                    })
            }
        })
    }

    useEffect(() => {
        setData(notes);
        setCategories([... new Set(notes.map(e => e.category))])
    }, [notes])

    const handleChange = useCallback((event) => {
        event.preventDefault();
        setKeyword(event.target.value)
    }, [setKeyword])

    const handleSelectChange = useCallback((event) => {
        event.preventDefault();
        setCategory(event.target.value)
    }, [setCategory])

    useEffect(() => {
        setData(notes.filter(e => e.title.toLowerCase().includes(keyword.toLowerCase())));
    }, [keyword])

    useEffect(() => {
        setData(notes.filter(e => e.category === category || category === ''));
    }, [category])

    return (
        <div>
            <section className={styles.search_container}>
                <p>Search</p>
                <input
                    className={styles.input_card}
                    type='text'
                    onChange={handleChange}
                    value={keyword}
                />
                <select
                    onChange={handleSelectChange}
                    value={category}
                >
                    <option value=''>Select category</option>
                    {categories.map(option => {
                        return (
                            <option key={option} value={option}>{option}</option>
                    )
                    })}
                </select>
            </section>
            <ul className={styles.cards_container}>
                {data.map(note => {
                    const arrayDate = note.createdAt.match(/\d+/g);
                    const day = arrayDate[2];
                    const month = arrayDate[1];
                    const hour = arrayDate[3];
                    const minute = arrayDate[4];
                    return (
                        <li className={styles.card} key={note.id}>
                            <div className={styles.card_header}>
                                <div>
                                    <h2>{note.title}</h2>
                                    <span>Status: {note.status}</span>
                                </div>
                                <div className={styles.card_button}>
                                    <span onClick={() => deleteNote(note.id)}><DeleteOutlined /></span>
                                    <span onClick={() => router.push(`${note.status}/${note.id}`)}><EditOutlined /></span>
                                </div>
                            </div>
                            <div className={styles.card_body}>
                                <p>{note.description}</p>
                            </div>
                            <div className={styles.card_footer}>
                                <span>{note.category}</span>
                                <span>{`${month}/${day}, ${hour}:${minute}hs`}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
