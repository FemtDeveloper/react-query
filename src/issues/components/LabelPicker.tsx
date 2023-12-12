import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { useLabels } from "../hooks/useLabels";
import { LoadingIcon } from "../../shared/LoadingIcon";

interface Props {
  selectedLabels: string[];
  onLabelChaged: (label: string) => void;
}

export const LabelPicker = ({ selectedLabels, onLabelChaged }: Props) => {
  const { labelQuery } = useLabels();

  if (labelQuery.isLoading) return <LoadingIcon />;

  return (
    <div>
      {labelQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "label-active" : null
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onLabelChaged(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
