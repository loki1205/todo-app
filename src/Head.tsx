import React from "react";
import sunIcon from '../images/icon-sun.svg'
import moonIcon from '../images/icon-moon.svg'
type PropsType = {
    darkModeEnabled: boolean,
    toggleDarkMode: () => void,
    addTask: (list: ListType[]) => void,
    taskList: ListType[]
}
interface ListType {
    id: number,
    task: string,
    completed: boolean;
  }
class Head extends React.Component<PropsType,{}>{
    state = {
        value: ''
    }
    changeValue(newValue: string){
        this.setState({
            value: newValue
        })
    }
    handleKeyDown(e:any){
        if (e.key === 'Enter') {
            this.addNewTask(this.state.value);
            this.changeValue('');
        }
    }
    addNewTask(value:string){
        let newTask = {
          id: new Date().getMilliseconds(),
          task: value,
          completed: false
        }
    
        let newList = [...this.props.taskList,newTask];
        this.props.addTask(newList);
      }
    render(): React.ReactNode {
        return (
            <div className="wraper-todo">
                <div className={this.props.darkModeEnabled ? "bg-top-dark" : "bg-top-light"}>
                    <div className="banner-section">
                        <h1 className="banner-head">TODO</h1>
                        <img onClick={this.props.toggleDarkMode.bind(this)} src={this.props.darkModeEnabled ? sunIcon : moonIcon}/>
                    </div>
                    <div className="input-section">
                        <input placeholder="Add a new task.." onKeyDown={(e) => this.handleKeyDown(e)} onChange={(e) =>  this.changeValue(e.target.value)} value={this.state.value} className={this.props.darkModeEnabled ? "input-area-dark" : "input-area-light"}type="text"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Head;