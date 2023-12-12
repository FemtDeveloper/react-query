import { Link, Navigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";
import { LoadingIcon } from "../../shared/LoadingIcon";

export const IssueView = () => {
  const { id = "0" } = useParams();

  const { issueQuery, commentsQuery } = useIssue(Number(id));

  if (issueQuery.isLoading) return <LoadingIcon />;
  if (!issueQuery.data) return <Navigate to="/issues/list" />;

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      {/* Primer comentario */}

      <IssueComment issue={issueQuery.data} />

      {commentsQuery.data?.map((comment) => (
        <IssueComment issue={comment} key={comment.id} />
      ))}

      {/* Comentario de otros */}
      {/* <IssueComment body={comment2} />
      <IssueComment body={comment3} /> */}
    </div>
  );
};
