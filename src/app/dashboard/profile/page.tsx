import ProfileForm from '@/components/dashboard/ProfileForm';

export default function ProfilePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الملف الشخصي</h1>
        <p className="text-gray-600">إدارة بياناتك الشخصية وكلمة المرور</p>
      </div>
      
      <ProfileForm />
    </div>
  );
}