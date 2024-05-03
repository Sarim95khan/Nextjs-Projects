interface PanelProps {
  children: React.ReactNode;
  isActive: boolean;
  title: string;
  onShow: () => void;
}

const Pannel: React.FC<PanelProps> = ({
  children,
  isActive,
  title,
  onShow,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </div>
  );
};

export default Pannel;
