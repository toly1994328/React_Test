import {connect} from 'react-redux';
import {loveChange} from '../actions';
import LovePanel from "../components/LovePanel";

const mapStateToProps = (state) => {


    return {who: state.love.who}
};

const mapDispatchToProps = (dispatch) => ({
    onChange: (value) => {
        dispatch(loveChange(value));
    },
    onClick: () => {
        dispatch(loveChange());
    }
});

const LoveApp = connect(
    mapStateToProps, mapDispatchToProps
)(LovePanel);

export default LoveApp;
