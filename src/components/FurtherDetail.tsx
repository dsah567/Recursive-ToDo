export default function FurtherDetail({addSubToDo}:
    {addSubToDo: boolean}
) {
  
    if (addSubToDo) {
        return <>AddSubToDo function</>
    } else {
        return <>show subtodos</>
    }
}
