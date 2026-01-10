export default function AttachmentUpload({ onAdd }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Attachments
      </label>
      <input
        type="file"
        multiple
        onChange={(e) => onAdd([...e.target.files])}
        className="block w-full text-sm"
      />
    </div>
  );
}
