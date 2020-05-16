import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';import { Menu } from "@material-ui/icons";
import {connect} from 'react-redux';
import { Dispatch } from "redux";
import { IState } from '../../Store/reducer';
import { closeModal } from '../../Store/actions';


interface IModalState {}

interface IModalProps {
    children?: any;
    title?: string;
    open: boolean;
    component: any;
    closeModal: Function;
}
class FormModal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);
  }

  closeModal = () => {
    this.props.closeModal()
  }
  render() {
    return (
        <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{ this.props.title}</DialogTitle>
        <DialogContent>
          {this.props.component}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.closeModal()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state : IState) => {
  return {
    open: state.modal_open,
    component: state.modal_component
  }
}



const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);

