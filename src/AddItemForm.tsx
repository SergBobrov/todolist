import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormType = {
    addItem: (title: string) => void
}


function AddItemForm(props: AddItemFormType) {

    const addItem = props.addItem;

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHendler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const OnAddTaskClick = () => {
        if (title.trim()) {
            addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required!");
        }
    }

    const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            OnAddTaskClick()
        }
    };

    return (
        <div>
            <input value={title}
                   onKeyPress={onKeyPressHendler}
                   onChange={onChangeHendler}
                   className={error ? "error" : ""}
            />

            <button onClick={OnAddTaskClick}
            >+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )

}

export default AddItemForm;


