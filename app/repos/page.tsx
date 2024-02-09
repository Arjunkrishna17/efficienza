"use client";

import React from "react";
import { GET_REPOS } from "@/apiEndPoints/api";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Repos = () => {
  const { data, isLoading, error } = useSWR(GET_REPOS, fetcher);

  return <div></div>;
};

export default Repos;
