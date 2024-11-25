import {
  DeleteIcon,
  EditSquareIcon,
  MoreHorizIcon,
  PersonIcon,
} from "@assets/svgs";
import { useState, useRef, useEffect } from "react";
import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";
import { Link } from "react-router-dom";
import routes from "@constants/routes";

interface MonitoringCardProps {
  name: string;
  manager: string;
  logoUrl: string;
  clientId: number;
}

const MonitoringCard: React.FC<MonitoringCardProps> = ({
  name,
  manager,
  logoUrl,
  clientId,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex w-[253px] rounded bg-white">
      <div className="flex w-full flex-col">
        <div className="relative flex justify-end px-3 py-2">
          <button
            type="button"
            className={`rounded-sm p-[6px] ${isMenuOpen ? "bg-neutral-100" : "hover:bg-neutral-100"}`}
            onClick={handleMenuToggle}
          >
            <MoreHorizIcon />
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute left-[204px] top-[52px] rounded border border-neutral-200 bg-white"
            >
              <button
                type="button"
                className="flex w-32 px-5 py-2 text-md font-medium hover:bg-neutral-100"
                onClick={handleEditModalOpen}
              >
                수정하기
                <EditSquareIcon className="ml-2" />
              </button>
              <div className="border-neutral-200" />
              <button
                type="button"
                className="flex w-32 px-5 py-2 text-md font-medium hover:bg-neutral-100"
                onClick={handleDeleteModalOpen}
              >
                삭제하기
                <DeleteIcon className="ml-2 fill-neutral-400" />
              </button>
            </div>
          )}
        </div>
        <Link to={routes.monitoring} className="flex flex-col">
          <div className="flex justify-center border-b-1 border-neutral-200">
            <img
              src={logoUrl}
              className="mb-10 mt-5 h-[72px] w-24 overflow-hidden rounded object-contain"
            />
          </div>
          <div className="flex w-full flex-col gap-1 py-4 pl-4 pr-5">
            <h2 className="text-left text-xl font-semibold text-title">
              {name}
            </h2>
            <div className="flex items-center">
              <PersonIcon className="mr-[6px]" />
              <p className="text-md font-semibold text-disable">{manager}</p>
            </div>
          </div>
        </Link>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          clientId={clientId}
          name={name}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          clientId={clientId}
          manager={manager}
          name={name}
          logoUrl={logoUrl}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MonitoringCard;
