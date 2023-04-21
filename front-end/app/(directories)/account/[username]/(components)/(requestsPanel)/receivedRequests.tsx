import requestsStyles from "./requestsPanel.module.css";

export const RequestsFromOthers = ({
  requestsFromOthers,
}: {
  requestsFromOthers: { id: number; username: string }[];
}) => {
  if (requestsFromOthers.length === 0) {
    return (
      <div className={requestsStyles["from-others-header"]}>
        <h1>Received Requests</h1>
        <p className={requestsStyles["no-requests"]}>Seems empty...</p>
      </div>
    );
  } else {
    return (
      <section className={requestsStyles["from-others"]}>
        <div className={requestsStyles["from-others-header"]}>
          <h1>Received Requests</h1>
        </div>

        <div className={requestsStyles["users-list"]}>
          {requestsFromOthers.reverse().map((eachRequest) => {
            return (
              <div
                key={eachRequest.id}
                className={requestsStyles["each-user-req"]}
              >
                <h3>{eachRequest.username}</h3>
                <div className={requestsStyles["accept-ignore"]}>
                  <button className={requestsStyles["accept"]}>Accept</button>
                  <button className={requestsStyles["ignore"]}>Ignore</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
};

export default RequestsFromOthers;
