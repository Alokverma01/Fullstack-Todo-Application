import { useState } from "react"

export function CreateTodo(props) {
    // react-query
    const [title, setTitle] = useState("");
    const [description , setDescription] = useState("");
    return <div>
        <input type="text" placeholder="title" onChange={ (e)=> {
            const value = e.target.value;
            setTitle(e.target.value);
        }} /> <br />
        <input type="text" placeholder="description" onChange={(e)=> {
            const value =  e.target.value;
            setDescription(e.target.value);
        }}/> <br />
    
        <button onClick={() => {
            fetch("http://localhost:1000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title : title,
                    description: description
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(async function(res){
                    if(res.ok) {
                    const json = await res.json();
                    alert("TODO Added Successfully");
                } else {
                    alert("Failded to add TODO");
                }
                })
                .catch(error => {
                    console.log("Error : " ,error);
                    alert("An error occured");
                });
        }}>Add a TODO</button>
    </div>
}