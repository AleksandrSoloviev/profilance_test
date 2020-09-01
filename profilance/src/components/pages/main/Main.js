import React from "react";
import {connect} from "react-redux";
import "./Main.scss"

class Main extends React.Component {

    renderGreet = () => {
      if(this.props.isAuth){
          return (
              <div className="greeting">{`Привет ${this.props.rights} !`}</div>
          )
      }
      else return <div className="greeting">Привет Гость!</div>
    };

    render() {
        return (
            <>
                {this.renderGreet()}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isModalShown: state.signModal.isModalShown,
        isAuth: state.signModal.isAuth,
        rights: state.signModal.rights
    }
}

export default connect(mapStateToProps)(Main);