import { withRouter } from "react-router-dom";

function Detail(props) {
  console.warn(props);
  return (
    <div className="row justify-content-center">
      <div className="mt-5 ratio ratio-4x3" style={{ maxWidth: 720 }}>
        <iframe
          title={props.match.params.url}
          src={"https://www.youtube.com/embed/" + props.match.params.url}
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default withRouter(Detail);
