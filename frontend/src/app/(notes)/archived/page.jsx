"use client"
import { ListNotes } from "@/components/notes/ListNotes";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Archived() {

    const { token } = useAuth();
    const [data, setData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes/by/user`, {
                    headers: {
                        authorization: token
                    }
                });
  
                
                setData(response.data.filter(e => e.status === 'archived'));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
  
        fetchData();
    }, [token]);
  
    return (
        <div>
            <section>
                <ListNotes notes={data} />
            </section>
        </div>
    );
}
