import Progress from "./subcomponents/Progress";

interface ProfessorCardProps {
  instructor: string;
}

const ProfessorCard = ({ instructor }: ProfessorCardProps) => {
  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl text-center">
        <div className="card-body">
          <div className="flex flex-col ml-auto mr-auto gap-3">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-24 ml-auto mr-auto">
                <span className="text-3xl">{instructor.charAt(0)}</span>
              </div>
            </div>
            <h2 className="card-title ">{instructor}</h2>
          </div>
          <div className="divider">Report Card</div>
          <div>5 Students</div>
          <Progress desc="A" value={1} count={5} />
        </div>
      </div>
    </div>
  );
};

export default ProfessorCard;
