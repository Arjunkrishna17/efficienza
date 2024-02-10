"use client";

import React, { useEffect, useState } from "react";
import { CheckboxGroup, Skeleton, Checkbox, Button } from "@nextui-org/react";
import { CustomCheckbox } from "../components/CustomCheckbox";
import useSWR from "swr";

import { GET_REPOS } from "@/apiEndPoints/api";

interface repo {
  id: string;
  name: string;
  selected: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Repos = () => {
  const [selected, setSelected] = React.useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState({
    isLoading: false,
    success: false,
    error: "",
  });

  const { data, isLoading, error } = useSWR(GET_REPOS, fetcher);

  useEffect(() => {
    if (data && data.length) {
      const selectedRepos = [];

      for (const repo of data) {
        if (repo.selected) {
          selectedRepos.push(repo.id);
        }
      }

      setSelected(selectedRepos);
    }
  }, [data]);

  const continueBtnHandler = async () => {
    setSelectedStatus((prev) => {
      return { ...prev, isLoading: true };
    });
    const res = await fetch(GET_REPOS, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repos: selected }),
    });
    if (res.ok) {
      setSelectedStatus({ success: true, isLoading: true, error: "" });
    } else {
      setSelectedStatus((prev) => {
        return {
          ...prev,
          error: "Something went wrong, please try again later",
        };
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center ">
      <div className="w-96 border rounded-lg px-5 py-5 bg-white space-y-5 shadow-lg">
        {data && data.length && (
          <CheckboxGroup
            label="Select Repos"
            value={selected}
            onChange={setSelected}
            color="warning"
            className="gap-2"
          >
            {data.map((repo: repo) => (
              <Checkbox value={repo.id} key={repo.id}>
                {repo.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}

        <div className="flex w-full justify-end">
          <Button onClick={() => continueBtnHandler()} color="warning">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Repos;
