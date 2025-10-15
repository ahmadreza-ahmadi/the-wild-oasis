function Empty({ resourceName }: { resourceName: string }) {
  return <p>No {resourceName.toLowerCase()} could be found.</p>;
}

export default Empty;
