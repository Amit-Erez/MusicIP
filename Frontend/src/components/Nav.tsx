import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  return (
    <div className="h-12 w-full flex fixed top-0 pl-16 pr-16 items-center justify-between bg-[#FFFFFF] border-b border-[#D3D1C7]">
      <div className="flex justify-between w-full max-w-325 mx-auto">

      <div className="flex items-center justify-center">
        <figure className="w-7 h-7 bg-[#26215C] text-[#F1EFE8] rounded flex items-center justify-center mr-2">
          <FontAwesomeIcon icon={faMusic} />
        </figure>
        <div className="text-[13px] text-[#2C2C2A] font-medium">
          Music IP Dashboard{" "}
          <span className="text-[#5F5E5A]">/ Funding Review</span>
        </div>
      </div>
      </div>
    </div>
  );
}
