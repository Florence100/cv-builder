import { Upload } from 'lucide-react';
import Image from 'next/image';

export const ProfilePage = () => {
  return (
    <div className="min-h-dvh flex flex-col items-center">
      <div className="flex gap-6">
        <Image
          src="https://github.com/shadcn.png"
          alt="avatar"
          width={120}
          height={120}
          className="shrink-0 rounded-full object-cover shadow-sm"
        />
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <label className="cursor-pointer flex items-center gap-2 group hover:opacity-80 transition-opacity">
            <Upload className="w-5 h-5 text-gray-800" strokeWidth={2.5} />
            <span className="text-[17px] font-medium text-gray-900">Upload avatar image</span>
            {/* Hidden file input for actual functionality */}
            <input type="file" className="hidden" accept=".png, .jpg, .gif" />
          </label>
          <p className="text-sm text-gray-500 pl-7">png, jpg or gif no more than 0.5MB</p>
        </div>
      </div>
    </div>
  );
};
