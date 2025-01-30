
import { Button } from '@/components/ui/button';
import { BookAIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
  return (
    <div className='flex justify-center items-center gap-3'>
        <Button
          variant='ghost'
          size='icon'
          className='text-orange-500'
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
            <ChevronLeft className='w-5 h-5' />
        </Button>
        <div className='flex gap-1'>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant='ghost'
              className={`w-8 h-8 ${index + 1 === currentPage ? 'bg-orange-500 text-white' : 'text-orange-500'}`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='text-orange-500'
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
            <ChevronRight className='w-5 h-5' />
        </Button>
    </div>
  )
}

export default Pagination
