import React, {ChangeEvent, useState} from "react";

type EditAbleSpanType = {
    value: string
    changeValue: (value: string) => void
}

function EditAbleSpan(props: EditAbleSpanType) {
    let [editMode, seteditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.value)

    const activateEditMode = () => {
        seteditMode(true)
    }

    const deActivateEditMode = () => {
        seteditMode(false)
        props.changeValue(title)
    }

    const onChangeHendler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }



    return (
        editMode
            ? <input value={title}
                     onBlur={deActivateEditMode}
                     autoFocus={true}
                     onChange={onChangeHendler}
            />


            : <span onDoubleClick={activateEditMode}> {props.value}</span>
    )
}

export default EditAbleSpan;