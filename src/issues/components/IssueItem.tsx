import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { Issue, State } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getIssueComments, getIssueInfo } from "../hooks";
import { timeSince } from "../../helpers";

interface Props {
  issue: Issue;
}

export const IssueItem = ({ issue }: Props) => {
  const { title, user, number, comments } = issue;

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number],
      queryFn: () => getIssueInfo(issue.number),
    });
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number, "comments"],
      queryFn: () => getIssueComments(issue.number),
    });
  };

  const presetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue);
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${number}`)}
      onMouseEnter={presetData}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Closed ? (
          <FiCheckCircle size={30} color="green" />
        ) : (
          <FiInfo size={30} color="red" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened {timeSince(issue.created_at)} ago by{" "}
            <span className="fw-bold">{user.login}</span>
            <div>
              {issue.labels.map((label) => (
                <span
                  key={label.id}
                  className="badge rounded-pill m-1"
                  style={{ backgroundColor: `#${label.color}`, color: "black" }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img src={user.avatar_url} alt="User Avatar" className="avatar" />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
