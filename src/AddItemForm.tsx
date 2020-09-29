import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


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

            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                onKeyPress={onKeyPressHendler}
                onChange={onChangeHendler}
                label={"Title"}
                error={!!error}
                helperText={error}
            />

            <Button onClick={OnAddTaskClick} size={"medium"}  color="primary" disableElevation>
                <AddBox/>
            </Button>

        </div>
    )

}

export default AddItemForm;


