import * as React from "react";
import {connect} from 'react-redux';
import { IState } from "../../Store/reducer";
import { Dispatch } from "redux";


interface IAddVideoFormState {}

interface IAddVideoFormProps {

}
class AddVideoForm extends React.Component<IAddVideoFormProps,IAddVideoFormState> {
    
    render() {
        return (
            <p> AddVideoForm</p>
        )
    }
}

const mapStateToProps = (state : IState) => {
    return {
      open: state.modal_open,
      component: state.modal_component
    }
  }
  
  
  

export default connect(mapStateToProps, null)(AddVideoForm);
