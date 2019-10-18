import React from "react";
import axios from "axios";


export default function MovieForm(props) {

    const [form, setForm] = React.useState({ title: "", director: "", metascore: "" });

    const handleChanges = event => {
        setForm({...form, [event.target.title]: event.target.value});
    };

    React.useEffect(() => {
        if (props.editingMovie) {
            setForm( {
                title: props.editingMovie.title,
                director: props.editingMovie.director,
                metascore: props.editingMovie.metascore,
            });
        } else {
            setForm({ title: "", director: "", metascore: "" });
        }
    }, [props.editingMovie])

    const submitHandler = event => {
        event.preventDefault();

        if(props.editingMovie) {
            axios
                .put(`http://localhost:5000/api/update-movie/${props.editingMovie.id}`, form)
                .then(res => {
                    console.log("PUT", res)
                    props.setMovie(res.data);
                    setForm({ title: "", director: "", metascore: "" });
                })
                .catch(error => console.log(error.response));
        }
    };

    const closeEdit = event => {
        event.preventDefault();
        props.setEditingMovie(null)
    }

    return (
        <div>
            <p>Edit Movie</p>
            <form onSubmit={submitHandler}>
                <input
                    required
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={handleChanges}
                    value={form.title}
                />
                 <input
                    required
                    type="text"
                    name="director"
                    placeholder="director"
                    onChange={handleChanges}
                    value={form.director}
                />
                 <input
                    required
                    type="number"
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChanges}
                    value={form.metascore}
                />
                <button type="submit">{props.editingMovie ? "SUBMIT EDIT" : "ADD MOVIE"}</button>
                <button onClick={closeEdit} >CANCEL</button>
            </form>
        </div>
    )
}

// id: 5,
// title: 'Tombstone',
// director: 'George P. Cosmatos',
// metascore: 89,
// stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],