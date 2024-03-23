import { useEffect, useRef, useState } from "react";
import checkIcon from '../images/icon-check.svg'
import crossIcon from '../images/icon-cross.svg'
interface ListType{
    id: number,
    task: string,
    completed: boolean;
  }
interface PropsType{
    darkModeEnabled: boolean,
    taskList: ListType[],
    changeTaskList: (list:ListType[]) =>  void
}
function TodoList(props:PropsType){
    let orginalTaskList = props.taskList;
    let darkModeEnabled = props.darkModeEnabled;
    const [selectedType, setSelectedType] = useState(1);
    let completedTaskList = orginalTaskList.filter(x => x.completed);
    let activeTaskList = orginalTaskList.filter(x => !x.completed);
    const [taskList, setTaskList] = useState<ListType[]>(orginalTaskList)
    const dragTask = useRef<number>(0)
    const draggedOverTask = useRef<number>(0)
    useEffect(() => {
        changeItemType(selectedType);
    },[orginalTaskList, completedTaskList, activeTaskList])
    function changeItemType(value: number){
        setSelectedType(value);
        switch(value){
            case 1:
                setTaskList(orginalTaskList)
                break;
            case 2: 
                setTaskList(activeTaskList)
                break;
            case 3:
                setTaskList(completedTaskList)
                break;
        }
    }

    function deleteItem(id:number){
        let newList = orginalTaskList.filter(x => x.id!==id);
        props.changeTaskList(newList);
    }

    function toggleCheck(id:number){
        let newList = orginalTaskList.map((x) => {
            if(x.id == id){
                x.completed = !x.completed;
                return x;
            }
            return x
        })
        props.changeTaskList(newList);
    }

    function handleSort(){
        const tasksClone = [...orginalTaskList];
        const temp = tasksClone[dragTask.current];
        tasksClone[dragTask.current] = tasksClone[draggedOverTask.current]
        tasksClone[draggedOverTask.current] = temp;
        props.changeTaskList(tasksClone)
    }

    function clearCompleted(){
        props.changeTaskList([...activeTaskList]);
    }

    return (
        <div className="todolist-wrapper">
            <div className={darkModeEnabled ? 'todo-tasks-dark' : 'todo-tasks-light'}>
                {taskList.map((element, index) =>{
                    return (
                        <div draggable="true" onDragEnter={() => (draggedOverTask.current = index)} onDragStart={() => (dragTask.current = index)} onDragEnd={handleSort} onDragOver={(e) => e.preventDefault()} key={element.id} className={darkModeEnabled ? 'task' : 'task-light'}>
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
                })}
                <div className={darkModeEnabled ? 'options-div' : 'options-div options-div-light'}>
                    <div className="items-left-wrapper">
                        {
                            selectedType == 3 ? <span className="item-counter">{completedTaskList.length} completed</span> : <span className="item-counter">{activeTaskList.length} items left</span>
                        }
                    </div>
                    <div className="item-type-wrapper">
                        <span className={selectedType==1 ? 'selected' : ''} onClick={() => {changeItemType(1)}}>All</span>
                        <span className={selectedType==2 ? 'selected' : ''} onClick={() => {changeItemType(2)}}>Active</span>
                        <span className={selectedType==3 ? 'selected' : ''} onClick={() => {changeItemType(3)}}>Completed</span>
                    </div>
                    <div onClick={clearCompleted} className="mark-completed-wrapper">
                        <span>Clear completed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList;