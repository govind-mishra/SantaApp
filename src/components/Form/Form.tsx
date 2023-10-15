import { useState } from "react"
import { ErrorPage } from "../ErrorPage/ErrorPage";
import axios from "axios";
import { SuccessPage } from "../SuccessPage/SuccessPage";
import './Form.css';

export default function Form() {
    const [user, setuser] = useState("");
    const [wish, setWish] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = { user, wish };
        try {
            const response = await axios.post('/submit', data);
            setSuccess(response.data.message)
            setError(null);//set error null if success.
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
                setSuccess(null);//set success null if error
            } else {
                console.log(error);
            }
        }
    };

    return (
        <>
            {error && <ErrorPage message={error}></ErrorPage>}
            {success && <SuccessPage message={success}></SuccessPage>}
            <p className="bold">Ho ho ho, what you want for Christmas?</p>
            <form onSubmit={handleSubmit}>
                who are you?
                <input name="userName" placeholder="charlie.brown" value={user} onChange={(event) => { setuser(event.target.value) }} />
                what do you want for christmas?
                <textarea
                    name="wish"
                    rows={10}
                    cols={45}
                    maxLength={100}
                    placeholder="Gifts!"
                    value={wish}
                    onChange={(event) => { setWish(event.target.value) }}
                ></textarea>
                <br />
                <button type="submit" id="submit-letter">Send</button>
            </form>
        </>

    )
}