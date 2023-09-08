import React from "react";

const SchemaOrg = ({ data }: any) => {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

export default SchemaOrg;
