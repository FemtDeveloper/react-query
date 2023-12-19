import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues, useIssuesInfinite } from "../hooks";
import { LoadingIcon } from "../../shared/LoadingIcon";
import { State } from "../interfaces";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesInfiniteQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const onLabelChaged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesInfiniteQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesInfiniteQuery.data?.pages.flat() ?? []}
            state={state}
            onStateChange={setState}
          />
        )}
        <button
          className="btn btn-outline-primary my-2"
          disabled={!issuesInfiniteQuery.hasNextPage}
          onClick={() => issuesInfiniteQuery.fetchNextPage()}
        >
          Load more...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onLabelChaged={onLabelChaged}
        />
      </div>
    </div>
  );
};
