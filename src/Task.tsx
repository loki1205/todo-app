import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import checkIcon from '../images/icon-check.svg'
import crossIcon from '../images/icon-cross.svg'
function Task(props:any){
    const {darkModeEnabled, toggleCheck, element, deleteItem} = props;
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable(element.id);
    const style = { 
        transition,
        transform: CSS.Transform.toString(transform)
     }
    return (
        <div style={style} ref={setNodeRef} {...attributes} {...listeners} draggable="true" className={darkModeEnabled ? 'task' : 'task-light'}>
            <div onClick={() => {toggleCheck(element.id)}} className="checkbox-div">
                <div className={darkModeEnabled ? 'circle-div' : 'circle-div-light'}>
                    <div className={darkModeEnabled && element.completed ? 'uncheck-dark completed' : element.completed ? 'uncheck-light completed' :  darkModeEnabled ? 'uncheck-dark' : 'uncheck-light'}>
                        {
                            element.completed ? (
                                <img src={checkIcon}></img>
                            ) : ''
                        }
                    </div>
                </div>
            </div>
            <span className={element.completed && darkModeEnabled ? 'taskName marked' : element.completed ? 'taskName marked-light' : 'taskName'}>{element.task}</span>
            <div className="cross-div">
                <img onClick={() => {deleteItem(element.id)}} src={crossIcon}/>
            </div>
        </div>
    )
}

export default Task;