import { Div } from "atomize";

function Banner (props) {

    console.log(props);

    return ( <Div
        
        textColor="gray700"
        position="fixed"
      >
        {props.Infos}
      </Div>
       );
}

export default Banner ;