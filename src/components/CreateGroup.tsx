// components/modals/CreateGroupModal.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Group } from '@/context/GroupContext';

interface CreateGroupData {
  groupName: string;
}

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGroupCreated: (group: Group) => void;
}

export function CreateGroupModal({
  isOpen,
  onClose,
  onGroupCreated, // Yeh lo
}: CreateGroupModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGroupData>({
    defaultValues: {
      groupName: '',
    },
  });

  const handleCreateGroup = async (data: CreateGroupData) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/group/create', {
        name: data.groupName,
      });

      if (response.data && response.data.data) {
        onGroupCreated(response.data.data);
      }

      setIsLoading(false);
      reset();
      onClose();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-zinc-950 border border-white/10 rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-base font-semibold text-white">
            Create New Group
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        <form
          id="create-group-form"
          onSubmit={handleSubmit(handleCreateGroup)}
          className="p-4 space-y-4"
        >
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-xs font-medium">
              Group Name
            </Label>
            <Input
              placeholder="e.g., Trip to Hunza"
              className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
              {...register('groupName', {
                required: 'Required',
                minLength: { value: 3, message: 'Min 3 chars' },
              })}
            />
            {errors.groupName && (
              <p className="text-xs text-red-400">{errors.groupName.message}</p>
            )}
          </div>
        </form>

        <div className="p-4 border-t border-white/10 flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/10 text-white hover:bg-white/5 h-9 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-group-form"
            className="flex-1 bg-white text-black hover:bg-zinc-200 h-9 text-xs"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
