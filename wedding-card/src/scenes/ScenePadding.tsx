function ScenePadding({ height, color }: { height: number; color: string }) {
  return (
    <div
      className="w-full"
      style={{
        height,
        backgroundColor: color,
      }}
    />
  );
}

export default ScenePadding;
